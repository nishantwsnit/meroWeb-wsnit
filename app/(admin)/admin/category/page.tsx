"use client";
import { useGenerateClient } from "@/hooks/useGenerateClient";
import {
  deleteCategory,
  fetchCategories,
  setCategory,
  setError,
  setLoading,
} from "@/lib/features/category/categorySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useMessage } from "@/providers/toastContext";
import {
  Flex,
  Button,
  Heading,
  Link,
  Pagination,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from "@aws-amplify/ui-react";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Category() {
  const router = useRouter();

  const { showSuccess, showError } = useMessage();

  const dispatch = useAppDispatch<any>();

  const { category, isLoading, error } = useAppSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  
  if (isLoading) {
    return <p>loading.....</p>;
  }

  return (
    <div className=" space-y-6">
      <Flex justifyContent={"space-between"}>
        <Heading level={3} fontSize={32}>
          Category
        </Heading>
        <Link href="/admin/category/create">
          <Button variation="primary">
            <Flex>
              <PlusIcon />
              <p> Create Category</p>
            </Flex>
          </Button>
        </Link>
      </Flex>
      <Table
        caption=""
        highlightOnHover={true}
        size="small"
        variation="striped"
      >
        <TableHead>
          <TableRow>
            <TableCell as="th">id</TableCell>
            <TableCell as="th">Name</TableCell>
            <TableCell as="th">iconType</TableCell>
            <TableCell as="th">Description</TableCell>
            <TableCell as="th">Created At</TableCell>
            <TableCell as="th">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {category &&
            category.map((item) => (
              <TableRow key={item?.id}>
                <TableCell>{item?.categoryId}</TableCell>
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.iconType}</TableCell>
                <TableCell className=" line-clamp-2">
                  {item?.description}
                </TableCell>
                <TableCell>{item?.createdAt.toString()}</TableCell>
                <TableCell>
                  <Flex>
                    <Button
                      size="small"
                      colorTheme="info"
                      onClick={() => {
                        router.push(
                          `/admin/category/create?id=${item?.categoryId}`
                        );
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      colorTheme="error"
                      onClick={async () => {
                        dispatch(
                          deleteCategory({
                            id: item?.categoryId as string,
                            onSuccess: (res) => {
                              dispatch(fetchCategories());
                              showSuccess(
                                res?.message ?? "Category deleted successfully"
                              );
                            },
                            onError: () => {
                              showError("Error deleting category");
                            },
                          })
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </Flex>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div>
        <Pagination
          totalPages={6}
          currentPage={1}
          onChange={(page) => console.log(page, "page")}
        />
      </div>
    </div>
  );
}
