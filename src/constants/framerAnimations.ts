export const FRAMER_SUB_SECTION_ANIMATION = {
  whileInView: {
    opacity: 1,
    x: 0,
    y: -7,
    transition: { duration: 0.5 },
  },
  initial: { opacity: 0, x: -40, y: 10, transition: { duration: 0.5 } },
  viewport: { margin: '-100px 0px 100px 0px', once: true },
}

export const FRAMER_SUB_SECTION_ANIMATION_BOTTOM = {
  whileInView: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.5 },
  },
  initial: { opacity: 0, x: -40, y: 10, transition: { duration: 0.5 } },
  viewport: { margin: '0px 0px -100px 0px', once: true },
}
