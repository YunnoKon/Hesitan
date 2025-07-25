<script>
  import { marked } from 'marked'

  let userPrompt = $state("")
  let textElm;

  $effect(() => {
    userPrompt;
    if(textElm){
      textElm.style.height = '1px';
      textElm.style.height = `${textElm.scrollHeight}px`;
    }
  })

  let text = `
# SvelteKit

Web development, streamlined. Read the [documentation](https://svelte.dev/docs/kit) to get started.

### Packages

| Package                                                                     | Changelog                                                     |
| --------------------------------------------------------------------------- | ------------------------------------------------------------- |
| [@sveltejs/kit](packages/kit)                                               | [Changelog](packages/kit/CHANGELOG.md)                        |
| [@sveltejs/adapter-auto](packages/adapter-auto)                             | [Changelog](packages/adapter-auto/CHANGELOG.md)               |
| [@sveltejs/adapter-cloudflare](packages/adapter-cloudflare)                 | [Changelog](packages/adapter-cloudflare/CHANGELOG.md)         |
| [@sveltejs/adapter-netlify](packages/adapter-netlify)                       | [Changelog](packages/adapter-netlify/CHANGELOG.md)            |
| [@sveltejs/adapter-node](packages/adapter-node)                             | [Changelog](packages/adapter-node/CHANGELOG.md)               |
| [@sveltejs/adapter-static](packages/adapter-static)                         | [Changelog](packages/adapter-static/CHANGELOG.md)             |
| [@sveltejs/adapter-vercel](packages/adapter-vercel)                         | [Changelog](packages/adapter-vercel/CHANGELOG.md)             |
| [@sveltejs/amp](packages/amp)                                               | [Changelog](packages/amp/CHANGELOG.md)                        |
| [@sveltejs/enhanced-img](packages/enhanced-img)                             | [Changelog](packages/enhanced-img/CHANGELOG.md)               |
| [@sveltejs/package](packages/package)                                       | [Changelog](packages/package/CHANGELOG.md)                    |
| [create-svelte](packages/create-svelte)                                     | [Changelog](packages/create-svelte/CHANGELOG.md)              |

[Additional adapters](https://sveltesociety.dev/packages?category=sveltekit-adapters) are maintained by the community.

## Bug reporting

Please make sure the issue you're reporting involves SvelteKit. Many issues related to how a project builds originate from [Vite](https://vitejs.dev/), which is used to build a SvelteKit project. You can create a new Vite project with npm create vite@latest for client-side only repros and npm create vite-extra@latest for SSR or library repros.

If an issue originates from Vite, please report it in the [Vite issue tracker](https://github.com/vitejs/vite/issues).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for information on how to develop SvelteKit locally.

## Supporting Svelte

Svelte is an MIT-licensed open source project with its ongoing development made possible entirely by fantastic volunteers. If you'd like to support their efforts, please consider:

- [Becoming a backer on Open Collective](https://opencollective.com/svelte).

Funds donated via Open Collective will be used for compensating expenses related to Svelte's development such as hosting costs. If sufficient donations are received, funds may also be used to support Svelte's development more directly.

## License

[MIT](https://github.com/sveltejs/kit/blob/main/LICENSE)`
</script>
<div class="bg-gradient-to-br from-[#0f1115] to-[#0b0c0f] text-white fixed h-[calc(100%-50px)] w-[80%] mx-3 mb-4 border-2 border-gray-700/50 rounded-xl right-0 overflow-y-auto">
  <div class="px-[10%] py-[5%] relative h-full">
    <div class="flex gap-4 flex-col pb-40">
      <div class="bg-white/10 rounded-xl py-3 px-6 text-left w-[70%]">
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
      </div>
      <div class="flex gap-5 items-baseline">
        <div class="font-dot text-sm font-black text-white">( . .)φ_</div>
        <div class="w-[calc(100%-85px)] markdown flex flex-col gap-1">
	        {@html marked(text)}
        </div>
      </div>
    </div>
    <div class="backdrop-blur-xl flex flex-col fixed bottom-10 w-[63.3%]">
      <textarea 
        bind:this={textElm} 
        bind:value={userPrompt}
        placeholder="Write your goals clearly..." 
        class="max-h-30 min-h-14 w-full font-medium scrollbar-thumb-dark scroll-pr-1 focus:outline-0 resize-none bg-white/6 p-4 rounded-xl rounded-b-none"
      ></textarea>
      <div class="bg-white/6 flex items-center px-4 py-3 justify-between rounded-b-xl">
        <div>
          <select value="amogus" name="model" class=" bg-transparent [&>option]:bg-[#1b1d20] focus:outline-0 text-white font-semibold text-sm block w-full pr-3">
            <option value="amogus">amogus</option>
          </select>
        </div>
        <button class="hover:shadow-lg hover:shadow-orange-500/30 hover:cursor-pointer hover:scale-120 transition-all duration-300 block rounded-full bg-gradient-to-br from-orange-500 to-orange-600 p-2">
          <img alt="send" class="w-5 h-5" src="send.svg"/>
        </button>
      </div>
    </div>
  </div>
</div>