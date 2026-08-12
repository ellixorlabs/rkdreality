import {seo} from './objects/seo'
import {socialLink} from './objects/socialLink'
import {featureItem} from './objects/featureItem'
import {footerLink} from './objects/footerLink'
import {footerColumn} from './objects/footerColumn'

import {hero} from './documents/hero'
import {property} from './documents/property'
import {founder} from './documents/founder'
import {testimonial} from './documents/testimonial'
import {faq} from './documents/faq'
import {siteSettings} from './documents/siteSettings'

export const schemaTypes = [
  // Objects (reusable)
  seo,
  socialLink,
  featureItem,
  footerLink,
  footerColumn,
  // Documents
  property,
  testimonial,
  faq,
  // Singletons
  siteSettings,
  hero,
  founder,
]
