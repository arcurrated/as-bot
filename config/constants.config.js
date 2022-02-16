const configServiceSetChain = [
	{
		code: 'oil',
		desc: 'Выполняем ли замену масла в двигателе❓',
		title: 'Замена масла ДВС',
		img: 'images/oil.webp',
	}, {
		code: 'air_filter',
		desc: 'Меняем воздушный фильтр❓',
		title: 'Замена воздушного фильтра',
		img: 'images/air_filter.webp',
	}, {
		code: 'ac_filter',
		desc: 'Меняем ли салонный фильтр❓',
		title: 'Замена салонного фильтра',
		img: 'images/ac_filter.webp',
	}, {
		code: 'belt',
		desc: 'Меняем ли приводной ремень❓',
		title: 'Замена приводного ремня',
		img: 'images/belt.webp',
	}, {
		code: 'sparks',
		desc: 'Меняем ли свечи❓',
		title: 'Замена свечей зажигания',
		img: 'images/sparks.webp',
	}, {
		code: 'transmission_oil',
		desc: 'Меняем ли масло в коробке❓',
		title: 'Замена масла в КПП',
		img: 'images/transmission_oil.webp',
	}
]

const diagnServiceSet = [
	{
		code: 'diagn',
		desc: 'Диагностика',
		title: 'Диагностика',
	}
]

const phrases = {
	invalidContactAnswer: "Воспользуйтесь специальной клавиатурой для отправки Вашего контакта",
	invalidAnswer: 'Вы ответили неправильно, попробуйте снова🙄',
	yesLabel: 'Да ✅',
	noLabel: 'Нет ❌',
	backLabel: "<< Назад",
	startLabel: "Начать ⚙",
	phoneNumberSuccessfullyReceived: 'Принято👏! Ожидайте звонка менеджера😁!',
	orderRequestSuccess: 'Ваша заявка принята👏! Ожидайте звонка менеджера😁!',
	wrongPhoneNumber: 'Это не ваш номер телефона. Попробуйте снова.',
	contactRequest: 'Отправьте Ваш контакт👇',

	selectServiceSet: 'Выбрать сет обслуживания 🙌',
	configServiceSet: 'Сконфигурировать сет ⚙',
	subcribeToDiagn: 'Записаться на диагностику 🛠',

	mainMenuText: "Со мной ты выберешь оптимальный набор работ, которые так нужны твоему железному другу!\n👨🔧",

	startText: "Привет👋!\nЯ запишу тебя на обслуживание твоей любимой машины. Со мной ты выберешь оптимальный набор работ, которые так нужны твоему железному другу!\n👨🔧",

	configServiceSetDescription: "Вы сами выберете работы, которые считаете нужным выполнить🦾:",
	selectServiceSetDescription: "Выберите сет обслуживания🙌:",
	subcribeToDiagnDescription: 'Мы🧑🔧 проверим подвеску, прочитаем электронные блоки💻 и проконтролируем все технические жидкости🔬',
	singleServiceSetDescription: '📄Работы по сету обслуживания:\n\n',

	singleOperationPrefix: '🔧 ',
	singleOperationPostfix: '\n',

	baseServiceSetTitle: "БАЗОВЫЙ",
	optimalServiceSetTitle: "ОПТИМАЛЬНЫЙ",
	progressiveServiceSetTitle: "ПРОДВИНУТЫЙ",
	maximumServiceSetTitle: "МАКСИМАЛЬНЫЙ",

	confirmSubcribeToDiagn: 'Записаться 👈',
	confirmSingleServiceSet: 'Записаться 👈',
}

const serviceSets = [
	[
		{
			code: 'oil',
			desc: 'Выполняем ли замену масла в двигателе?',
			title: 'Замена масла ДВС',
		}, {
			code: 'air_filter',
			desc: 'Меняем воздушный фильтр?',
			title: 'Замена воздушного фильтра',
		},
	],
	[
		{
			code: 'oil',
			desc: 'Выполняем ли замену масла в двигателе?',
			title: 'Замена масла ДВС',
		}, {
			code: 'air_filter',
			desc: 'Меняем воздушный фильтр?',
			title: 'Замена воздушного фильтра',
		}, {
			code: 'ac_filter',
			desc: 'Меняем ли салонный фильтр?',
			title: 'Замена салонного фильтра',
		}, {
			code: 'sparks',
			desc: 'Меняем ли свечи?',
			title: 'Замена свечей зажигания',
		}
	],
	[
		{
			code: 'oil',
			desc: 'Выполняем ли замену масла в двигателе?',
			title: 'Замена масла ДВС',
		}, {
			code: 'air_filter',
			desc: 'Меняем воздушный фильтр?',
			title: 'Замена воздушного фильтра',
		}, {
			code: 'ac_filter',
			desc: 'Меняем ли салонный фильтр?',
			title: 'Замена салонного фильтра',
		}, {
			code: 'belt',
			desc: 'Меняем ли приводной ремень?',
			title: 'Замена приводного ремня',
		}, {
			code: 'sparks',
			desc: 'Меняем ли свечи?',
			title: 'Замена свечей зажигания',
		}
	],
	[
		{
			code: 'oil',
			desc: 'Выполняем ли замену масла в двигателе?',
			title: 'Замена масла ДВС',
		}, {
			code: 'air_filter',
			desc: 'Меняем воздушный фильтр?',
			title: 'Замена воздушного фильтра',
		}, {
			code: 'ac_filter',
			desc: 'Меняем ли салонный фильтр?',
			title: 'Замена салонного фильтра',
		}, {
			code: 'belt',
			desc: 'Меняем ли приводной ремень?',
			title: 'Замена приводного ремня',
		}, {
			code: 'sparks',
			desc: 'Меняем ли свечи?',
			title: 'Замена свечей зажигания',
		}, {
			code: 'transmission_oil',
			desc: 'Меняем ли масло в коробке?',
			title: 'Замена масла в КПП',
		}
	]
]


module.exports = {
	configServiceSetChain,
	phrases,
	diagnServiceSet,
	serviceSets,
}