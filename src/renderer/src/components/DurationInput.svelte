<script>
  let { month = $bindable(), day = $bindable() } = $props()

  const pad = (n) => n.toString().padStart(2, "0");

  function clampMonth() {
    let n = parseInt(month.replace(/\D/g, ""));
    if (isNaN(n)) n = 0;
    if (n < 0) n = 0;
    if (n > 96) n = 96;
    month = pad(n);
  }

  function clampDay(){
    let n = parseInt(day.replace(/\D/g, ""));
    if (isNaN(n)) n = 0;
    if (n < 0) n = 0;
    if (n > 30) n = 30;
    day = pad(n);
  }

  function incMonth(){ clampMonth(); month = pad((Number(month)+1) % 97); }
  function decMonth(){ clampMonth(); month = pad((Number(month)+96) % 97); }
  function incDay(){ clampDay(); day = pad((Number(day)+ 1) % 31); }
  function decDay(){ clampDay(); day = pad((Number(day)+ 30) % 31); }
</script>

<div class="flex justify-center items-center gap-3 py-3">
  <div class="flex flex-col items-center">
    <h1 class="text-gray-500">Months</h1>
    <div class="flex flex-col items-center font-bold">
      <button type="button" class="hover:cursor-pointer w-12 h-8 text-xl" onclick={incMonth}>▲</button>
      <input bind:value={month} class="font-dot text-center text-3xl outline-none w-12" type="text" inputmode="numeric" maxlength="2" onblur={clampHour}/>
      <button type="button" class="hover:cursor-pointer w-12 h-8 text-xl" onclick={decMonth}>▼</button>
    </div>
  </div>

  <div class="">
    <h1 class="text-2xl mt-5 font-dot">:</h1>
  </div>

  <div class="flex flex-col items-center">
    <h1 class="text-gray-500">Days</h1>
    <div class="flex flex-col items-center font-bold">
      <button type="button" class="hover:cursor-pointer w-12 h-8 text-xl" onclick={incDay}>▲</button>
      <input bind:value={day} class="font-dot text-center text-3xl outline-none w-12" type="text" inputmode="numeric" maxlength="2" onblur={clampMinute}/>
      <button type="button" class="hover:cursor-pointer w-12 h-8 text-xl" onclick={decDay}>▼</button>
    </div>
  </div>
</div>
