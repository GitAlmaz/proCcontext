<template>
	<div class="home">
		<Modal v-if="getModals.search">
			<template slot="content">
        <div class="home__search-list" v-if="getSearchCards.length">
          <Card v-for="card in getSearchCards" :key="card.id" :oData="card"/>
        </div>
        <span v-else>
          ничего не найдено
        </span>
      </template>
		</Modal>
		<Modal v-if="getModals.change">
			<template slot="content">
				<input class="input-text" type="text" placeholder="Описание карточки" v-model="cardTitle" />
				<Checkbox :oData="{ text: 'Статус', id: 'completed' }" v-model="cardStatus" />
				<button @click="changeCardHandler">Изменить</button>
			</template>
		</Modal>
		<Modal v-if="getModals.create">
			<template slot="content">
				<input class="input-text" type="text" placeholder="Описание карточки" v-model="cardTitle" />
				<Checkbox :oData="{ text: 'Статус', id: 'completed' }" v-model="cardStatus" />
				<button @click="createCardHandler">Создать</button>
			</template>
		</Modal>
		<div class="home__content">
			<div class="home__side-bar">
				<Sidebar />
			</div>
			<div class="home__dashboard">
				<Dashboard :oData="{ title: 'Ожидает исполнения', status: 'waiting', cards: getCards.waiting }" />
			</div>
			<div class="home__dashboard">
				<Dashboard :oData="{ title: 'Исполнено', status: 'waiting', cards: getCards.completed }" />
			</div>
		</div>
	</div>
</template>

<script>
import Dashboard from '@/components/Dashboard'
import Sidebar from '@/components/Sidebar'
import Modal from '@/components/Modal'
import Checkbox from '@/components/UI/Checkbox'
import Card from '@/components/Card'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
	name: 'Home',
	components: {
		Dashboard,
		Sidebar,
		Modal,
    Checkbox,
    Card
	},
	data: () => ({
		cards: {
			waiting: [],
			completed: []
		},
		cardTitle: '',
		cardStatus: false
	}),
	computed: {
		...mapGetters(['getCards', 'getModals', 'getEditableCard', 'getSearchCards'])
	},
	watch: {
		getCards() {
			this.sortCards()
    }
	},
	async mounted() {
		await this.fetchCards()
	},
	methods: {
		...mapMutations(['modalToggle']),
		...mapActions(['fetchCards', 'createCard', 'changeCard']),
		createCardHandler() {
			this.createCard({
				id: Date.now(),
				title: this.cardTitle,
				completed: this.cardStatus
			})
			this.cardTitle = ''
			this.cardStatus = false
			this.modalToggle({
				create: false
			})
		},
		changeCardHandler() {
			if (this.cardTitle) {
				this.changeCard({
					...this.getEditableCard,
					title: this.cardTitle,
					completed: this.cardStatus
				})
			} else {
				this.changeCard({
					...this.getEditableCard,
					completed: this.cardStatus
				})
			}
			this.cardTitle = ''
			this.cardStatus = false
			this.modalToggle({
				change: false
			})
		}
	}
}
</script>

<style lang="scss">
.home {
	background: #f1f1f1;
	overflow: hidden;
  @media screen and (max-width: 940px) {
    overflow: visible;
  }
	&__content {
		height: 100vh;
		display: flex;
		justify-content: center;
		padding: 15px 0;
    @media screen and (max-width: 940px) {
      flex-wrap: wrap;
      min-height: 100vh;
      height: auto;
    }
	} 
  &__search-list {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
	&__side-bar {
		margin: 0 15px;
    @media screen and (max-width: 940px) {
      width: 100%;
      margin: 0 15px 20px 15px;
    }
	}
	&__dashboard {
		min-width: 300px;
		width: 30%;
		margin: 0 15px;
    @media screen and (max-width: 940px) {
      width: 45%;
    }
    @media screen and (max-width: 680px) {
      width: 100%;
      min-height: 400px;
      max-height: 400px;
      margin-bottom: 20px;
    }
	}
}
</style>
