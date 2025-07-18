<script>
    import { PageState } from '../states/PageState.svelte'

    let { title = '' } = $props()
    let textColor = $derived(PageState.createTool!=title.toLowerCase() ? "text-white" : "text-orange-500 border-b-1")
    //const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<button onclick={() => PageState.createTool = title.toLowerCase() } class="{textColor} grow hover:cursor-pointer">
    {title}
</button>