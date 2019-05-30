# Storybook

This project uses [Storybook](https://storybook.js.org/basics/introduction/) as a component 
development environment and playground.

A new story should be written in `./src/stories` any time a new component is added to 
`./components`. Stories should be written in JSX rather than template strings for syntax 
highlighting and better editor experience.

Write stories that demonstrate any important component functionality and variations. Stories should
show a complete picture of how a component can be configured and used.

Start the Storybook dev server:

```bash
npm run storybook:serve
```

Build static version for deployment:

```bash
npm run storybook:build
```
