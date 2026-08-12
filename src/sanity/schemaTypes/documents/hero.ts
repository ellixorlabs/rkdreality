import {defineArrayMember, defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

/**
 * Singleton — the homepage hero section. Enforced as a single document via
 * Studio structure (fixed id "hero").
 */
export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Small label above the headline, e.g. "Banglore and beyond...".',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'highlightWord',
      title: 'Highlighted word',
      type: 'string',
      description:
        'Optional. If this word/phrase appears in the headline it is shown in italic gold.',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background image URL',
      type: 'url',
      description: 'Paste a direct image URL for the hero background.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary button',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({
          name: 'href',
          title: 'Link',
          type: 'string',
          description: 'Anchor (e.g. "#properties") or full URL.',
        }),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary button',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({
          name: 'href',
          title: 'Link',
          type: 'string',
          description: 'Anchor (e.g. "#contact") or full URL.',
        }),
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Trust stats',
      type: 'array',
      description: 'The small stat tiles shown below the hero copy.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g. "100%", "1,200+", "RERA"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Hero'}
    },
  },
})
