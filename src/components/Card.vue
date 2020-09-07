<template>
	<div class="card" :class="{ open }" :id="oData.id">
		<div class="card__head">
			<p class="card__name">
				{{ oData.id }}
			</p>
			<span class="card__status" :class="{ ready: oData.completed }">
				<font-awesome-icon icon="dot-circle" />
			</span>
			<a href="#" class="card__btn-edit" @click.prevent="editCardHandler">
				<font-awesome-icon icon="pen" />
			</a>
			<a href="#" class="card__btn-delete" @click.prevent="deleteCardHandler">
				<font-awesome-icon icon="trash" />
			</a>
		</div>
		<p class="card__desc" @click="open = !open">
			{{ oData.title }}
		</p>
	</div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
	props: {
		oData: {
			type: Object
		}
	},
	data: () => ({
		open: false
	}),
	methods: {
		...mapMutations(['modalToggle', 'setEditCard']),
		...mapActions(['deleteCardAction']),
		editCardHandler(e) {
			this.setEditCard(this.oData)
			this.modalToggle({ change: true })
		},
		deleteCardHandler(e) {
			this.setEditCard(this.oData)
			this.deleteCardAction()
		}
	}
}
</script>

<style lang="scss">
.card {
	width: 100%;
	overflow: hidden;
	border-radius: 10px;
	padding: 10px;
	box-shadow: 0px 5px 10px -5px rgba(0, 0, 0, 0.3);
	background: #f9f9f9;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	overflow: hidden;
	animation: fade-in 0.3s ease-in;
	&:not(:last-child) {
		margin-bottom: 15px;
	}
	&:hover {
		.card__btn-edit {
			display: inline;
		}
		.card__btn-delete {
			display: inline;
		}
	}
	&.open {
		.card__desc {
			white-space: normal;
			overflow: visible;
		}
	}
	&__head {
		width: 100%;
		display: flex;
		margin-bottom: 10px;
	}
	&__name {
		font-size: 16px;
		margin-right: auto;
	}
	&__status {
		font-size: 14px;
		&.waiting {
			color: darkred;
		}
		&.ready {
			color: green;
		}
	}
	&__btn {
		&-edit {
			font-size: 12px;
			color: #333;
			margin-left: 10px;
			display: none;
			opacity: 0.5;
			&:hover {
				opacity: 1;
			}
		}
		&-delete {
			font-size: 12px;
			color: #333;
			opacity: 0.5;
			margin-left: 10px;
			display: none;
			&:hover {
				opacity: 1;
			}
		}
	}
	&__desc {
		font-size: 14px;
		color: #777;
		width: 100%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		cursor: pointer;
	}
}
@keyframes fade-in {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
