const initState = {
    goods: [],
    goodsCount: 0
};

export default (state = initState, action) => {

    switch (action.type) {
        case 'SET_COUNT_GOODS':
            return { ...state, goodsCount: action.payload };
        case 'SET_GOODS':
            return { ...state, goods: action.payload };
        default:
            return state;
    }
};
