import { BlogState } from "@/redux/interface";
import { createSlice, PayloadAction, type Slice } from "@reduxjs/toolkit";

const blogState: BlogState = {
  blogList: [
    {
      id: "1",
      title: "测试redux-toolkit",
    },
  ],
};

const blogSlice: Slice = createSlice({
  name: "blog",
  initialState: blogState,
  reducers: {
    setBlogList(state: BlogState, { payload }: PayloadAction<BlogState[]>) {
      state.blogList = payload;
    },
  },
});

export const { setBlogList } = blogSlice.actions;
export default blogSlice.reducer;
