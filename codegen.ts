import type { CodegenConfig } from '@graphql-codegen/cli'
import process from 'process'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.HYGRAPH_URL,
  documents: 'src/queries/*.ts',
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
      config: {
        withHooks: true,
        withComponent: false,
        futureProofEnums: true,
        avoidOptionals: true,
        maybeValue: 'T | undefined',
      },
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
}

export default config
