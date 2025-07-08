// vite.config.js
import { defineConfig } from "file:///D:/Prem_team/Real-Problem-Based-on-Size/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Prem_team/Real-Problem-Based-on-Size/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import obfuscator from "file:///D:/Prem_team/Real-Problem-Based-on-Size/frontend/node_modules/rollup-plugin-obfuscator/dist/rollup-plugin-obfuscator.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    obfuscator({
      compact: true,
      controlFlowFlattening: true,
      deadCodeInjection: true,
      debugProtection: true,
      debugProtectionInterval: true,
      disableConsoleOutput: true,
      identifierNamesGenerator: "hexadecimal",
      log: false,
      renameGlobals: false,
      rotateStringArray: true,
      selfDefending: true,
      stringArray: true,
      stringArrayEncoding: ["base64"],
      stringArrayIndexShift: true,
      stringArrayWrappersCount: 2,
      stringArrayWrappersChainedCalls: true,
      stringArrayWrappersType: "variable",
      transformObjectKeys: true,
      unicodeEscapeSequence: false
    })
  ],
  build: {
    rollupOptions: {
      plugins: [
        obfuscator({
          compact: true,
          controlFlowFlattening: true,
          deadCodeInjection: true,
          debugProtection: true,
          debugProtectionInterval: true,
          disableConsoleOutput: true,
          identifierNamesGenerator: "hexadecimal",
          log: false,
          renameGlobals: false,
          rotateStringArray: true,
          selfDefending: true,
          stringArray: true,
          stringArrayEncoding: ["base64"],
          stringArrayIndexShift: true,
          stringArrayWrappersCount: 2,
          stringArrayWrappersChainedCalls: true,
          stringArrayWrappersType: "variable",
          transformObjectKeys: true,
          unicodeEscapeSequence: false
        })
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcmVtX3RlYW1cXFxcUmVhbC1Qcm9ibGVtLUJhc2VkLW9uLVNpemVcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFByZW1fdGVhbVxcXFxSZWFsLVByb2JsZW0tQmFzZWQtb24tU2l6ZVxcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovUHJlbV90ZWFtL1JlYWwtUHJvYmxlbS1CYXNlZC1vbi1TaXplL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCBvYmZ1c2NhdG9yIGZyb20gJ3JvbGx1cC1wbHVnaW4tb2JmdXNjYXRvcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBvYmZ1c2NhdG9yKHtcclxuICAgICAgY29tcGFjdDogdHJ1ZSxcclxuICAgICAgY29udHJvbEZsb3dGbGF0dGVuaW5nOiB0cnVlLFxyXG4gICAgICBkZWFkQ29kZUluamVjdGlvbjogdHJ1ZSxcclxuICAgICAgZGVidWdQcm90ZWN0aW9uOiB0cnVlLFxyXG4gICAgICBkZWJ1Z1Byb3RlY3Rpb25JbnRlcnZhbDogdHJ1ZSxcclxuICAgICAgZGlzYWJsZUNvbnNvbGVPdXRwdXQ6IHRydWUsXHJcbiAgICAgIGlkZW50aWZpZXJOYW1lc0dlbmVyYXRvcjogJ2hleGFkZWNpbWFsJyxcclxuICAgICAgbG9nOiBmYWxzZSxcclxuICAgICAgcmVuYW1lR2xvYmFsczogZmFsc2UsXHJcbiAgICAgIHJvdGF0ZVN0cmluZ0FycmF5OiB0cnVlLFxyXG4gICAgICBzZWxmRGVmZW5kaW5nOiB0cnVlLFxyXG4gICAgICBzdHJpbmdBcnJheTogdHJ1ZSxcclxuICAgICAgc3RyaW5nQXJyYXlFbmNvZGluZzogWydiYXNlNjQnXSxcclxuICAgICAgc3RyaW5nQXJyYXlJbmRleFNoaWZ0OiB0cnVlLFxyXG4gICAgICBzdHJpbmdBcnJheVdyYXBwZXJzQ291bnQ6IDIsXHJcbiAgICAgIHN0cmluZ0FycmF5V3JhcHBlcnNDaGFpbmVkQ2FsbHM6IHRydWUsXHJcbiAgICAgIHN0cmluZ0FycmF5V3JhcHBlcnNUeXBlOiAndmFyaWFibGUnLFxyXG4gICAgICB0cmFuc2Zvcm1PYmplY3RLZXlzOiB0cnVlLFxyXG4gICAgICB1bmljb2RlRXNjYXBlU2VxdWVuY2U6IGZhbHNlLFxyXG4gICAgfSlcclxuICBdLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICBvYmZ1c2NhdG9yKHtcclxuICAgICAgICAgIGNvbXBhY3Q6IHRydWUsXHJcbiAgICAgICAgICBjb250cm9sRmxvd0ZsYXR0ZW5pbmc6IHRydWUsXHJcbiAgICAgICAgICBkZWFkQ29kZUluamVjdGlvbjogdHJ1ZSxcclxuICAgICAgICAgIGRlYnVnUHJvdGVjdGlvbjogdHJ1ZSxcclxuICAgICAgICAgIGRlYnVnUHJvdGVjdGlvbkludGVydmFsOiB0cnVlLFxyXG4gICAgICAgICAgZGlzYWJsZUNvbnNvbGVPdXRwdXQ6IHRydWUsXHJcbiAgICAgICAgICBpZGVudGlmaWVyTmFtZXNHZW5lcmF0b3I6ICdoZXhhZGVjaW1hbCcsXHJcbiAgICAgICAgICBsb2c6IGZhbHNlLFxyXG4gICAgICAgICAgcmVuYW1lR2xvYmFsczogZmFsc2UsXHJcbiAgICAgICAgICByb3RhdGVTdHJpbmdBcnJheTogdHJ1ZSxcclxuICAgICAgICAgIHNlbGZEZWZlbmRpbmc6IHRydWUsXHJcbiAgICAgICAgICBzdHJpbmdBcnJheTogdHJ1ZSxcclxuICAgICAgICAgIHN0cmluZ0FycmF5RW5jb2Rpbmc6IFsnYmFzZTY0J10sXHJcbiAgICAgICAgICBzdHJpbmdBcnJheUluZGV4U2hpZnQ6IHRydWUsXHJcbiAgICAgICAgICBzdHJpbmdBcnJheVdyYXBwZXJzQ291bnQ6IDIsXHJcbiAgICAgICAgICBzdHJpbmdBcnJheVdyYXBwZXJzQ2hhaW5lZENhbGxzOiB0cnVlLFxyXG4gICAgICAgICAgc3RyaW5nQXJyYXlXcmFwcGVyc1R5cGU6ICd2YXJpYWJsZScsXHJcbiAgICAgICAgICB0cmFuc2Zvcm1PYmplY3RLZXlzOiB0cnVlLFxyXG4gICAgICAgICAgdW5pY29kZUVzY2FwZVNlcXVlbmNlOiBmYWxzZSxcclxuICAgICAgICB9KVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwVSxTQUFTLG9CQUFvQjtBQUN2VyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxnQkFBZ0I7QUFFdkIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sV0FBVztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsdUJBQXVCO0FBQUEsTUFDdkIsbUJBQW1CO0FBQUEsTUFDbkIsaUJBQWlCO0FBQUEsTUFDakIseUJBQXlCO0FBQUEsTUFDekIsc0JBQXNCO0FBQUEsTUFDdEIsMEJBQTBCO0FBQUEsTUFDMUIsS0FBSztBQUFBLE1BQ0wsZUFBZTtBQUFBLE1BQ2YsbUJBQW1CO0FBQUEsTUFDbkIsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLE1BQ2IscUJBQXFCLENBQUMsUUFBUTtBQUFBLE1BQzlCLHVCQUF1QjtBQUFBLE1BQ3ZCLDBCQUEwQjtBQUFBLE1BQzFCLGlDQUFpQztBQUFBLE1BQ2pDLHlCQUF5QjtBQUFBLE1BQ3pCLHFCQUFxQjtBQUFBLE1BQ3JCLHVCQUF1QjtBQUFBLElBQ3pCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixTQUFTO0FBQUEsUUFDUCxXQUFXO0FBQUEsVUFDVCxTQUFTO0FBQUEsVUFDVCx1QkFBdUI7QUFBQSxVQUN2QixtQkFBbUI7QUFBQSxVQUNuQixpQkFBaUI7QUFBQSxVQUNqQix5QkFBeUI7QUFBQSxVQUN6QixzQkFBc0I7QUFBQSxVQUN0QiwwQkFBMEI7QUFBQSxVQUMxQixLQUFLO0FBQUEsVUFDTCxlQUFlO0FBQUEsVUFDZixtQkFBbUI7QUFBQSxVQUNuQixlQUFlO0FBQUEsVUFDZixhQUFhO0FBQUEsVUFDYixxQkFBcUIsQ0FBQyxRQUFRO0FBQUEsVUFDOUIsdUJBQXVCO0FBQUEsVUFDdkIsMEJBQTBCO0FBQUEsVUFDMUIsaUNBQWlDO0FBQUEsVUFDakMseUJBQXlCO0FBQUEsVUFDekIscUJBQXFCO0FBQUEsVUFDckIsdUJBQXVCO0FBQUEsUUFDekIsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
