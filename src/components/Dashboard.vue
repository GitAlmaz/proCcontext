<template>
	<div class="dashboard">
		<div class="dashboard__head">
			<p class="dashboard__title" :class="oData.status">{{ oData.title }}</p>
		</div>
		<div class="dashboard__body">
			<div class="dashboard__cards" v-if="oData.cards.length">
				<Card v-for="card in oData.cards" :key="card.id" :oData="card" />
			</div>
			<Loader v-else />
		</div>
	</div>
</template>

<script>
import Card from '@/components/Card'
import Loader from '@/components/Loader'
export default {
	components: {
		Card,
		Loader
	},
	props: {
		oData: {
			type: Object,
			required: true,
			default: {
				title: 'Title',
				status: 'waiting',
				cards: []
			}
		}
	}
}
</script>

<style lang="scss">
.dashboard {
	width: 100%;
	height: 100%;
	background: #fff;
	border-radius: 10px;
	box-shadow: 0px 2px 10px -5px rgba(0, 0, 0, 0.3);
	overflow: hidden;
	::-webkit-scrollbar {
		width: 5px;
	}
	::-webkit-scrollbar-thumb {
		background: rgba(30, 30, 30, 0.2);
		border-radius: 10px;
	}
	&__head {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px;
		border-bottom: 1px solid #999;
		div {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
	&__body {
		padding: 10px;
		height: calc(100% - 47px);
		overflow-y: auto;
	}
	&__title {
		font-size: 14px;
		color: #555;
		text-align: center;
	}
	&__search {
		width: 100%;
		font-size: 14px;
		border-radius: 15px;
		border: none;
		background: #f5f5f5;
		appearance: none;
		outline: none;
		padding: 5px 15px;
		&:focus {
			border: none;
		}
	}
	&__btn-add {
		color: #333;
		font-size: 18px;
		opacity: 0.7;
		&:hover {
			opacity: 1;
		}
	}
	&__cards {
		display: flex;
		flex-direction: column;
	}
}
</style>
