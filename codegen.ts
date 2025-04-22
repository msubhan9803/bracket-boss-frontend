import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'http://localhost:8080/graphql',
  documents: ['./graphql/queries/**/*.ts', './graphql/mutations/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './graphql/generated/': {
      preset: 'client',
      plugins: [],
    },
  }
}
 
export default config