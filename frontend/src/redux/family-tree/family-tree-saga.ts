import { takeEvery, put, call } from "redux-saga/effects";
import {
  addFamilyMemberFulfilled,
  addFamilyMemberPending,
  addFamilyMemberReject,
  deleteFamilyMemberFulfilled,
  deleteFamilyMemberPending,
  deleteFamilyMemberReject,
  editFamilyMemberFulfilled,
  editFamilyMemberPending,
  editFamilyMemberReject,
  fetchTreeFulfilled,
  fetchTreePending,
  fetchTreeReject,
} from "./family-tree-slice";
import {
  addFamilyMember,
  AddFamilyMemberParams,
  deleteFamilyMember,
  DeleteFamilyMemberParams,
  editFamilyMember,
  EditFamilyMemberParams,
  fetchTreeById,
  FetchTreeByIdParams,
} from "../../api";
import { FamilyMemberType, FamilyTreeDetailsType } from "../../types";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleFetchTree(action: PayloadAction<FetchTreeByIdParams>) {
  try {
    const tree: FamilyTreeDetailsType = yield call(
      fetchTreeById,
      action.payload
    );

    yield put(fetchTreeFulfilled(tree));
  } catch (error: any) {
    yield put(fetchTreeReject(error.message));
  }
}

function* handleAddFamilyMember(action: PayloadAction<AddFamilyMemberParams>) {
  try {
    const newFamilyMember: FamilyMemberType = yield call(
      addFamilyMember,
      action.payload
    );

    yield put(addFamilyMemberFulfilled(newFamilyMember));
  } catch (error: any) {
    yield put(addFamilyMemberReject(error.message));
  }
}

function* handleEditFamilyMember(
  action: PayloadAction<EditFamilyMemberParams>
) {
  try {
    const updatedMember: FamilyMemberType = yield call(
      editFamilyMember,
      action.payload
    );

    yield put(editFamilyMemberFulfilled(updatedMember));
  } catch (error: any) {
    yield put(editFamilyMemberReject(error.message));
  }
}

function* handleDeleteFamilyMember(
  action: PayloadAction<DeleteFamilyMemberParams>
) {
  try {
    const deletedMember: FamilyMemberType = yield call(
      deleteFamilyMember,
      action.payload
    );

    yield put(deleteFamilyMemberFulfilled(deletedMember));
  } catch (error: any) {
    yield put(deleteFamilyMemberReject(error.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(fetchTreePending.type, handleFetchTree);
  yield takeEvery(addFamilyMemberPending.type, handleAddFamilyMember);
  yield takeEvery(editFamilyMemberPending.type, handleEditFamilyMember);
  yield takeEvery(deleteFamilyMemberPending.type, handleDeleteFamilyMember);
}
