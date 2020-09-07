import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		cards: {
			completed: [],
			waiting: []
		},
		searchCards: [],
		modals: {
			create: false,
			change: false,
			search: false
		},
		createModal: false,
		changeModal: false,
		editableCard: {}
	},
	mutations: {
		setCompletedCards(state, payload) {
			state.cards.completed = payload
		},
		setWaitingCards(state, payload) {
			state.cards.waiting = payload
		},
		modalToggle(state, payload) {
			state.modals = {
				...payload
			}
		},
		setEditCard(state, payload) {
			state.editableCard = payload
		},
		setSearchCards: (state, payload) => (state.searchCards = payload)
	},
	actions: {
		async fetchCards({ commit }) {
			try {
				const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
				const data = await res.json()
				data.map(card => {
					if (card.completed) {
						this.state.cards.completed.indexOf(card) === -1 && commit('setCompletedCards', [...this.state.cards.completed, card])
					} else {
						this.state.cards.waiting.indexOf(card) === -1 && commit('setWaitingCards', [...this.state.cards.waiting, card])
					}
				})
			} catch (error) {
				console.error(error)
			}
		},
		createCard({ commit }, payload) {
			payload?.completed
				? commit('setCompletedCards', [...this.state.cards.completed, payload])
				: commit('setWaitingCards', [...this.state.cards.waiting, payload])
		},
		changeCard({ commit }, payload) {
			if (this.state.editableCard.completed) {
				const filterArr = [...this.state.cards.completed, payload].filter(item => item.id !== payload.id)
				commit('setCompletedCards', filterArr)
				if (payload.completed) {
					commit('setCompletedCards', [...filterArr, payload])
				} else {
					commit('setWaitingCards', [...this.state.cards.waiting, payload])
				}
			} else {
				const filterArr = [...this.state.cards.waiting, payload].filter(item => item.id !== payload.id)
				commit('setWaitingCards', filterArr)
				if (payload.completed) {
					commit('setCompletedCards', [...this.state.cards.completed, payload])
				} else {
					commit('setWaitingCards', [...filterArr, payload])
				}
			}
		},
		searchCardsAction({ commit }, payload) {
			const number = parseInt(payload)
			const arr = [...this.state.cards.completed, ...this.state.cards.waiting].filter(item => item.id === number)
			commit('setSearchCards', arr)
		},
		deleteCardAction({ commit }) {
			if (this.state.editableCard.completed) {
				const filterArr = [...this.state.cards.completed, this.state.editableCard].filter(item => item.id !== this.state.editableCard.id)
				commit('setCompletedCards', filterArr)
			} else {
				const filterArr = [...this.state.cards.waiting, this.state.editableCard].filter(item => item.id !== this.state.editableCard.id)
				commit('setWaitingCards', filterArr)
			}
		}
	},
	getters: {
		getCards(state) {
			return state.cards
		},
		getModals(state) {
			return state.modals
		},
		getEditableCard: state => state.editableCard,
		getSearchCards: state => state.searchCards
	},
	modules: {}
})
