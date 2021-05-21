# six-hertz-cnpc-scripts
Custom NPC Scripts used on the Six Hertz of Separation server.

We use GrallVM instead of Java which means we get all the nice ES6 features. This does mean that you MUST use GrallVM for these scripts to work.

NOTE: To get GrallVM to allow Java exposures you must pass the following flag to the java executable `-Dpolyglot.js.nashorn-compat=true`

Currently using deno cli for linting, deno cli Bundler for bundeling and a deno script for making the bundle exports into exposed functions. Need to get around to a single command deno script.

# NPC API

I am currently working on generating lib files for the CNPC api. Those files are for 1.12.2. This will eventually be split off into another project just containing the docs.
