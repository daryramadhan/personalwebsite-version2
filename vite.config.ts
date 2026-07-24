import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function portfolioDataPersistence() {
  return {
    name: 'portfolio-data-persistence',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // 1. Handle Image Upload & Auto-Optimization Payload
        if (req.url?.startsWith('/api/upload-image') && req.method === 'POST') {
          const urlObj = new URL(req.url, `http://${req.headers.host}`);
          const filename = urlObj.searchParams.get('filename') || `uploaded_${Date.now()}.webp`;
          
          const chunks: Buffer[] = [];
          req.on('data', chunk => {
            chunks.push(chunk);
          });
          req.on('end', () => {
            try {
              const buffer = Buffer.concat(chunks);
              const targetDir = path.resolve(__dirname, 'public/uploads');
              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
              }
              const targetPath = path.resolve(targetDir, filename);
              fs.writeFileSync(targetPath, buffer);
              
              const relativePath = `/uploads/${filename}`;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, filePath: relativePath }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message || 'Failed to save uploaded image' }));
            }
          });
        }
        // 2. Handle Portfolio Serialization & Saving
        else if (req.url === '/api/save-portfolio' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const filePath = path.resolve(__dirname, 'src/app/data/portfolioData.ts');
              const fileContent = fs.readFileSync(filePath, 'utf-8');
              
              const marker = 'export const portfolioInfo';
              const markerIndex = fileContent.indexOf(marker);
              if (markerIndex === -1) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Marker not found in portfolioData.ts' }));
                return;
              }
              
              const header = fileContent.substring(0, markerIndex);
              
              // Dynamically build the variableMap by parsing all imports from the top of the file
              const dynamicVariableMap: Record<string, string> = {};
              const importRegex = /import\s+([a-zA-Z0-9_]+)\s+from\s+["']@\/imports\/LandingPage\/([^"']+)["']/g;
              
              let match;
              while ((match = importRegex.exec(header)) !== null) {
                const varName = match[1];
                const filename = match[2];
                dynamicVariableMap[`/src/imports/LandingPage/${filename}`] = varName;
              }

              let serializedInfo = JSON.stringify(data.portfolioInfo, null, 2);
              let serializedSocial = JSON.stringify(data.socialLinks, null, 2);
              let serializedClients = JSON.stringify(data.clients, null, 2);
              let serializedProjects = JSON.stringify(data.projects, null, 2);

              for (const [imgUrl, varName] of Object.entries(dynamicVariableMap)) {
                serializedInfo = serializedInfo.replaceAll(`"${imgUrl}"`, varName);
                serializedSocial = serializedSocial.replaceAll(`"${imgUrl}"`, varName);
                serializedClients = serializedClients.replaceAll(`"${imgUrl}"`, varName);
                serializedProjects = serializedProjects.replaceAll(`"${imgUrl}"`, varName);
              }

              serializedInfo = serializedInfo.replace(/"([a-zA-Z0-9_]+)":/g, '$1:');
              serializedSocial = serializedSocial.replace(/"([a-zA-Z0-9_]+)":/g, '$1:');
              serializedClients = serializedClients.replace(/"([a-zA-Z0-9_]+)":/g, '$1:');
              serializedProjects = serializedProjects.replace(/"([a-zA-Z0-9_]+)":/g, '$1:');

              const newContent = header + 
                `export const portfolioInfo: PortfolioInfo = ${serializedInfo};\n\n` +
                `export const socialLinks: SocialLink[] = ${serializedSocial};\n\n` +
                `export const clients: Client[] = ${serializedClients};\n\n` +
                `export const projects: Project[] = ${serializedProjects};\n`;

              fs.writeFileSync(filePath, newContent, 'utf-8');
              
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message || 'Failed to save portfolio data' }));
            }
          });
        } else {
          next();
        }
      });
    }
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    portfolioDataPersistence(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
