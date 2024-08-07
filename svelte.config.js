import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-node";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    alias: {
      $Stores: "src/lib/Stores",
      $Components: "src/lib/Components",
      $server: "src/lib/server",
      $Become: "src/lib/Components/Become",
      $Gathering: "src/lib/Components/Gathering",
      $Menu: "src/lib/Components/Menu",
      $Stepper: "src/lib/Components/Stepper",
      $Icons: "src/lib/Icons",
    },
    csp: {
      directives: {
        "script-src": ["self", "https://cdn.telesages.com"],
      },
      reportOnly: {
        "script-src": ["self", "https://cdn.telesages.com"],
        "report-uri": ["/TODO:"],
      },
    },
    paths: {
      assets: "https://cdn.telesages.com",
    },
    // csrf: {
    // 	checkOrigin: process.env.NODE_ENV === 'development' ? false : true
    // },
    // //TODO!
    // csp: {
    // 	directives: {
    // 		'default-src': ['*']
    // 	}
    // },
    // embedded: true,
  },

  preprocess: [vitePreprocess({})],
};

export default config;
