"use client";
import {
  createCategory,
  fetchCategoriesById,
  updateCategory,
} from "@/lib/features/category/categorySlice";
import { directoryApi } from "@/lib/features/directory/directorySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useMessage } from "@/providers/toastContext";
import CategoryCreateForm, {
  CategoryCreateFormInputValues,
} from "@/ui-components/CategoryCreateForm";
import CategoryUpdateForm from "@/ui-components/CategoryUpdateForm";
import DirectoryCreateForm, {
  DirectoryCreateFormInputValues,
} from "@/ui-components/DirectoryCreateForm";
import DirectoryUpdateForm from "@/ui-components/DirectoryUpdateForm";
import React, { useEffect } from "react";

export default function Create({
  searchParams: { id },
}: {
  searchParams: { id: string };
}) {
  const { showSuccess, showError } = useMessage();

  const dispatch = useAppDispatch();

  const { directory } = useAppSelector((state) => state.directory);

  const handleCreateDirectory = async (
    values: DirectoryCreateFormInputValues
  ) => {
    const data = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v !== null)
    ) as DirectoryCreateFormInputValues;

    id
      ? dispatch(
          directoryApi.updateDirectory({
            id,
            updatedCategory: {
              ...data,
            },
          })
        )
      : dispatch(
          directoryApi.createDirectory({
            newEntity: {
              ...data,
            },
            onSuccess: (res: { message: any }) => {
              showSuccess(res.message ?? "Category created successfully");
            },
            onError: (err: { message: any }) => {
              showError(err.message ?? "Error creating category");
            },
          })
        );
  };

  useEffect(() => {
    if (id) {
      dispatch(directoryApi.fetchDirectoryById(id));
    }
  }, [id]);

  return (
    <div>
      {id && directory ? (
        <DirectoryUpdateForm
          id={id}
          directory={directory}
          onSubmit={(values) => {
            handleCreateDirectory(values);
            return values;
          }}
          onSuccess={(res) => {
            console.log(res, "success");
            showSuccess("Category udpated successfully");
          }}
          onError={(err) => {
            console.log(err, "error");
            showError("Error creating category");
          }}
        />
      ) : (
        <DirectoryCreateForm
          onSubmit={(values) => {
            handleCreateDirectory(values);
            return values;
          }}
          onSuccess={(res) => {
            console.log(res, "success");
            showSuccess("Category created successfully");
          }}
          onError={(err) => {
            console.log(err, "error");
            showError("Error creating directory");
          }}
        />
      )}
    </div>
  );
}
