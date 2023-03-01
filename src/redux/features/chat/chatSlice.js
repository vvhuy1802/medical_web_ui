import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dataChat: [
    {
      id: 1,
      roll: 'admin',
      type: 'text', 
      message: 'Chào bạn, Medeli có thể hỗ trợ gì cho bạn ạ?',
      timestamp: Date.now()
    }, 
  ],
  checkurgent: false,
}

export default createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setDataChat: (state, action) => {
      state.dataChat.push(action.payload)
    },
    setCheckUrgent: (state, action) => {
      state.checkurgent = action.payload
      console.log(state.checkurgent)
    }
  }
})
