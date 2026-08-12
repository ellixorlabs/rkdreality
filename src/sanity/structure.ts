import type {StructureResolver} from 'sanity/structure'
import {
  CogIcon,
  UserIcon,
  HomeIcon,
  CommentIcon,
  HelpCircleIcon,
  StarIcon,
} from '@sanity/icons'

// Singletons are enforced here (fixed document IDs) and excluded from the
// generic document lists below to avoid duplicates.
const SINGLETONS = ['siteSettings', 'hero', 'founder']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings'),
        ),
      S.listItem()
        .title('Hero')
        .icon(StarIcon)
        .child(S.document().schemaType('hero').documentId('hero').title('Hero')),
      S.listItem()
        .title('Founder')
        .icon(UserIcon)
        .child(S.document().schemaType('founder').documentId('founder').title('Founder')),

      S.divider(),

      S.documentTypeListItem('property').title('Properties').icon(HomeIcon),
      S.documentTypeListItem('testimonial').title('Testimonials').icon(CommentIcon),
      S.documentTypeListItem('faq').title('FAQs').icon(HelpCircleIcon),

      S.divider(),

      // Any future document types appear here automatically.
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId()
        return (
          !!id &&
          !SINGLETONS.includes(id) &&
          !['property', 'testimonial', 'faq'].includes(id)
        )
      }),
    ])
