<template>
	<div class="modal">
		<span class="modal__backdrop" @click="() => modalToggle({ create: false, change: false, search: false })"></span>
		<div class="modal__overlay">
			<slot name="content"> </slot>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
	methods: {
		...mapMutations(['modalToggle'])
	}
}
</script>

<style lang="scss">
.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 20;
	&__backdrop {
		backdrop-filter: blur(5px);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		cursor: pointer;
		animation: fade-in 0.3s ease-in;
	}
	&__overlay {
		position: relative;
		min-width: 350px;
		max-width: 600px;
		background: #fff;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0px 5px 20px -5px rgba(0, 0, 0, 0.3);
		animation: fade-up 0.3s ease-in;
		.checkbox {
			margin-bottom: 20px;
		}
		button {
			display: flex;
			align-items: center;
			justify-content: center;
			background: green;
			box-shadow: 0px 2px 10px -5px rgba(0, 0, 0, 0.6);
			color: #fff;
			border-radius: 36px;
			text-decoration: none;
			padding: 10px 25px;
			transition: 0.2s;
			outline: none;
			border: none;
			cursor: pointer;
			&:hover {
				background: darken(green, 5%);
			}
		}
	}
}
@keyframes fade-in {
	from {
		opacity: 0;
		visibility: hidden;
	}
	to {
		opacity: 1;
		visibility: visible;
	}
}
@keyframes fade-up {
	from {
		opacity: 0;
		transform: translateY(50px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
