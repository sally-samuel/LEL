import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'leveneenergies-studio',
  projectId: 'ilajnehi',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev) => {
      const unpublish = prev.find((a) => a.action === 'unpublish')
      const others = prev.filter((a) => a.action !== 'unpublish')
      return unpublish ? [others[0], unpublish, ...others.slice(1)] : prev
    },
  },
})