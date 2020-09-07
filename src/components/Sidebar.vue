<template>
	<div class="side-bar">
		<input
			type="text"
			placeholder="Поиск по имени"
			class="side-bar__search"
			@input="searchCardHandler"
			v-model="searchText"
			ref="searchInput"
		/>
		<a href="#" class="side-bar__btn-add" @click.prevent="createModalShow">
			создать карточку
			<font-awesome-icon icon="plus-square" />
		</a>
	</div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
	data: () => ({
		searchText: ''
	}),
	methods: {
		...mapMutations(['modalToggle']),
		...mapActions(['searchCardsAction']),
		createModalShow() {
			this.modalToggle({ create: true })
		},
		searchCardHandler() {
			if (this.searchText) {
				this.modalToggle({ search: true })
				this.searchCardsAction(this.searchText)
			}
		}
	}
}
</script>

<style lang="scss">
.side-bar {
	width: 250px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	&__search {
		width: 100%;
		font-size: 14px;
		border-radius: 36px;
		border: none;
		background: #fff;
		appearance: none;
		outline: none;
		padding: 10px 15px;
		box-shadow: 0px 2px 10px -5px rgba(0, 0, 0, 0.3);
		margin-bottom: 10px;
		&:focus {
			border: none;
			position: relative;
			z-index: 25;
		}
	}
	&__btn-add {
		display: flex;
		align-items: center;
		background: #fff;
		box-shadow: 0px 2px 10px -5px rgba(0, 0, 0, 0.3);
		color: #333;
		border-radius: 36px;
		text-decoration: none;
		padding: 10px 25px;
		transition: 0.2s;
		&:hover {
			background: #f5f5f5;
		}
		svg {
			margin-left: 10px;
		}
	}
}
</style>
