import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['./graphql/queries/**/*.ts', './graphql/mutations/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './graphql/generated/': {
      preset: 'client',
      config: {
        documentMode: 'string'
      }
    },
  }
}
 
export default config