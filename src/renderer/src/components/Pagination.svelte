<script>
    let { data = $bindable(), header, content } = $props()

    let showItem = $state(24)
    let pageCount = $derived(Math.ceil(data.length/showItem));
    let currentPage = $state(1)
    let displayData = $derived(data.slice((currentPage-1)*showItem, currentPage*showItem))

    let spreadPage = $derived([ ...Array(pageCount).keys() ].map( i => i+1 ))
</script>

{#if data.length}
    <div class="py-3 flex justify-between items-center">
        <h1 class="text-xl font-bold">{header}</h1>
        <div class="flex gap-2">
            <p class="text-gray-500">Item Per Page:</p>
            <select bind:value={showItem} name="showItem" class="bg-white/10 [&>option]:bg-[#1b1d20] rounded-lg pr-3 focus:outline-0 text-white font-semibold text-sm block">
                <option selected value={12}>12</option>
                <option selected value={24}>24</option>
                <option selected value={36}>36</option>
                <option selected value={48}>48</option>
            </select>
        </div>
    </div>
    {#each displayData as d}
        {@render content(d)}
    {/each}
    <div class="flex items-center justify-center gap-2 font-dot mb-4">
        <button class="text-4xl hover:cursor-pointer hover:text-orange-500 disabled:text-gray-700/60" disabled={currentPage==1} onclick={() => { currentPage-- }}>⯇</button>
        
        <div class="[&::-webkit-scrollbar]:h-1.5 flex gap-4 w-fit overflow-x-auto">
            {#each spreadPage as page}
            <button class="{currentPage==page ? "text-orange-500" : "text-white"} hover:text-orange-500 hover:cursor-pointer" onclick={() => currentPage = page}>{page}</button>
            {/each}
        </div>
        <button class="text-4xl hover:cursor-pointer hover:text-orange-500 disabled:text-gray-700/60" disabled={currentPage==pageCount} onclick={() => { currentPage++ }}>⯈</button>
    </div>
{/if}