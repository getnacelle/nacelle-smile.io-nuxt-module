// const tags = ['fiter::fit::slim', 'filter::fit::regular', 'filter::fit::tall']
const transformTags = (tags, tagPrefix) => {
  return tags
    .filter(tag => {
      return tag.split('::')[0] === 'filter'
    })
    .map(tag => {
      const tagSubstrings = tag.split('::')
      return { [tagSubstrings[1]]: tagSubstrings[2] }
    })
}

export default transformTags

// const transformedTags = transformTags(tags, 'filter')
