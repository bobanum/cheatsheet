<template>
  <div id="app">
    <app-header/>    
    <app-nav/> 
    <div class="body">
      <router-view/>
    </div>   
  </div>
</template>

<style lang="scss">
:root {
	--font-size: 14pt;
	font-size: var(--font-size);
	font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
	font-family: 'Fira Sans', sans-serif;
	--font-code: 'Ubuntu Mono', monospace;
  --hue: 210;
  --couleur-principale: hsl(var(--hue), 20%, 33%);
	--couleur-secondaire: hsl(var(--hue), 14%, 53%);
	--couleur-coche: hsl(var(--hue), 20%, 33%);
	--couleur-highlight: hsl(var(--hue), 22%, 90%);
}
html {
	height: 100%;
}

body {
	height: 100%;
	margin: 0;
	display:unset;
}
h1,h2,h3,h4,h5,h6,figure {
  margin: 0;
}
#app {
	min-height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	& > header,
	& > footer {
		background-color: var(--couleur-principale);
		background-image: url(/images/motif_filet.svg);
		background-size: 6em;
		padding: .5em 1em;
		color: #fff;
	}

	& > header {
		order: -1000;
	}

	& > footer {
		order: 1000;
	}
	& > .body {
    order: 1000;
    padding: 1em;  
	}
}

</style>
<script>

export default {
  components: {
    "app-header": require("@/components/app/Header").default,
    "app-nav": require("@/components/app/Nav").default,
  }
}
</script>