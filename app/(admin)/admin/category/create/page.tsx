"use client";
import {
  createCategory,
  fetchCategoriesById,
  updateCategory,
} from "@/lib/features/category/categorySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useMessage } from "@/providers/toastContext";
import CategoryCreateForm, {
  CategoryCreateFormInputValues,
} from "@/ui-components/CategoryCreateForm";
import CategoryUpdateForm from "@/ui-components/CategoryUpdateForm";
import React, { useEffect } from "react";

export default function Create({
  searchParams: { id },
}: {
  searchParams: { id: string };
}) {
  const { showSuccess, showError } = useMessage();

  const dispatch = useAppDispatch();

  const { categoryById } = useAppSelector((state) => state.category);

  const handleCreateDirectory = async (
    values: CategoryCreateFormInputValues
  ) => {
    const data = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v !== null)
    ) as CategoryCreateFormInputValues;

    id
      ? dispatch(
          updateCategory({
            id,
            updatedCategory: {
              ...data,
            },
          })
        )
      : dispatch(
          createCategory({
            newEntity: {
              ...data,
            },
            onSuccess: (res) => {
              showSuccess(res.message ?? "Category created successfully");
            },
            onError: (err) => {
              showError(err.message ?? "Error creating category");
            },
          })
        );
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchCategoriesById(id));
    }
  }, [id]);

  return (
    <div>
      {id && categoryById ? (
        <CategoryUpdateForm
          categoryId={id}
          category={categoryById}
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
        <CategoryCreateForm
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
