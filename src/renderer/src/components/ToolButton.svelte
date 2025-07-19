<script>
    import { PageState } from '../states/PageState.svelte'

    let { title = '' } = $props()
    let textColor = $derived(PageState.createTool!=title.toLowerCase() ? "text-white" : "font-bold text-orange-500 border-b-2")
    //const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<button onclick={() => PageState.createTool = title.toLowerCase() } class="{textColor} grow hover:cursor-pointer hover:text-orange-500">
    {title}
</button>