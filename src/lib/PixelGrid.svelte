<ul>
	{#each Array(2080) as _, index}
    {@const id = `pixel-${index}`}
		<li>
      <input type="checkbox" {id} />
			<label for={id} />
    </li>
	{/each}
</ul>

<style lang="postcss">
	ul {
		display: grid;
    gap: 1px;
		grid-template-columns: repeat(80, minmax(0, 1fr));
	}
	li {
		@apply flex relative;
    min-height: 1em;
	}
  label {
    @apply flex-1 border cursor-pointer;
  }
  input:checked + label {
    @apply bg-orange-400;
  }
  input {
    @apply absolute invisible pointer-events-none;
  }

</style>
