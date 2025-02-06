import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FamilyMemberType, FamilyTreeDetailsType } from "../../types";
import {
  AddFamilyMemberParams,
  DeleteFamilyMemberParams,
  EditFamilyMemberParams,
  FetchTreeByIdParams,
} from "../../api";

type TreeState = {
  id: number | null;
  name: string | null;
  members: FamilyMemberType[];
  loading: boolean;
  error: string | null;
};

const initialState: TreeState = {
  id: null,
  name: null,
  members: [],
  loading: false,
  error: null,
};

const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    addFamilyMemberPending(state, _: PayloadAction<AddFamilyMemberParams>) {
      state.loading = true;
      state.error = null;
    },
    deleteFamilyMemberPending(
      state,
      _: PayloadAction<DeleteFamilyMemberParams>
    ) {
      state.loading = true;
      state.error = null;
    },
    editFamilyMemberPending(state, _: PayloadAction<EditFamilyMemberParams>) {
      state.loading = true;
      state.error = null;
    },
    fetchTreePending(state, _: PayloadAction<FetchTreeByIdParams>) {
      state.loading = true;
      state.error = null;
    },

    addFamilyMemberFulfilled(state, action: PayloadAction<FamilyMemberType>) {
      state.loading = false;
      state.members.push(action.payload);
    },
    deleteFamilyMemberFulfilled(
      state,
      action: PayloadAction<FamilyMemberType[]>
    ) {
      state.loading = false;
      state.members = state.members.filter(
        (member) => !action.payload.some(({ id }) => id === member.id)
      );
    },
    editFamilyMemberFulfilled(state, action: PayloadAction<FamilyMemberType>) {
      state.loading = false;
      console.log(action.payload);
      state.members = state.members.map((member) =>
        member.id === action.payload.id ? action.payload : member
      );
    },
    fetchTreeFulfilled(state, action: PayloadAction<FamilyTreeDetailsType>) {
      state.loading = false;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.members = action.payload.members;
    },

    addFamilyMemberReject(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    editFamilyMemberReject(state) {
      state.loading = true;
      state.error = null;
    },
    deleteFamilyMemberReject(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchTreeReject(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addFamilyMemberPending,
  addFamilyMemberFulfilled,
  addFamilyMemberReject,
  deleteFamilyMemberPending,
  deleteFamilyMemberFulfilled,
  deleteFamilyMemberReject,
  editFamilyMemberPending,
  editFamilyMemberFulfilled,
  editFamilyMemberReject,
  fetchTreePending,
  fetchTreeFulfilled,
  fetchTreeReject,
} = treeSlice.actions;

export default treeSlice.reducer;
