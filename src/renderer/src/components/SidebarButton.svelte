<script>
    import { PageState } from '../states/PageState.svelte'

    let { title = '' } = $props()
    let textColor = $derived(PageState.current!=title.toLowerCase() ? "text-white" : "text-orange-500")
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_missing_attribute, a11y_no_static_element_interactions-->
<a onclick={() => PageState.current = title.toLowerCase() } class="{textColor} font-semibold group mb-4 ml-4.5 mr-10 text-xl block relative cursor-pointer">
    {title}
    <span class="rounded-2xl absolute left-0 bottom-0 h-[0.150rem] w-full bg-current transform scale-x-0 origin-bottom-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
</a>