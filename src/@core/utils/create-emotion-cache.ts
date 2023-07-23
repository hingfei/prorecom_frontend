import createCache from '@emotion/cache'

/**
 * Function to create an Emotion cache instance.
 *
 * @returns {EmotionCache} The Emotion cache instance.
 */
export const createEmotionCache = () => {
  return createCache({ key: 'css' })
}
