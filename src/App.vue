<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="scss">
* {
	margin: 0;
	box-sizing: border-box;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
.input-text {
	width: 100%;
	border: none;
	outline: none;
	padding: 10px 20px;
	font-size: 14px;
	margin-bottom: 20px;
	box-shadow: 0 2px 10px -5px rgba(0, 0, 0, 0.6);
	border-radius: 36px;
}
</style>
