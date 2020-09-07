<template>
	<div class="checkbox">
		<span>{{oData.text}}</span>
		<input type="checkbox" :name="oData.id" :id="oData.id" @input="$emit('input', $event.target.checked)" />
		<label :for="oData.id">
			<span></span>
		</label>
	</div>
</template>

<script>
export default {
	props: {
		oData: {
			type: Object
		}
	}
}
</script>

<style lang="scss">
.checkbox {
	width: 100%;
	display: flex;
	position: relative;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
	span {
		font-size: 14px;
		font-weight: 500;
		margin-right: 20px;
	}
	input {
		display: none;
		width: 0;
		height: 0;
		&:checked {
			& + label {
				background: lightgreen;
				span {
					transform: translateX(35px);
				}
			}
		}
	}
	label {
		width: 60px;
		height: 25px;
		position: relative;
		border-radius: 36px;
		background: #dbdbdb;
		transition: 0.3s;
		cursor: pointer;
		span {
			display: block;
			width: 23px;
			height: 23px;
			border-radius: 50%;
			background: #fff;
			position: absolute;
			left: 1px;
			top: 1px;
			transition: 0.3s;
		}
	}
}
</style>
