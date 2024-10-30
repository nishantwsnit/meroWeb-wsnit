"use client";

import { useEffect, useState } from "react";
import { useGenerateClient } from "@/hooks/useGenerateClient";
import {
  Button,
  Flex,
  Heading,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@aws-amplify/ui-react";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { directoryApi } from "@/lib/features/directory/directorySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useRouter } from "next/navigation";

export default function Directory() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { directory, isLoading, error } = useAppSelector(
    (state) => state.directory
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(directoryApi.fetchDirectory());
    };

    fetchData();
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-5">
      <Flex justifyContent={"space-between"}>
        <Heading level={3} fontSize={32}>
          Directory
        </Heading>
        <Link href="/admin/directory/create">
          <Button variation="primary">
            <Flex>
              <PlusIcon />
              <p>Create Directory</p>
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
            <TableCell as="th">ID</TableCell>
            <TableCell as="th">Title</TableCell>
            <TableCell as="th">Image</TableCell>
            <TableCell as="th">Created At</TableCell>
            <TableCell as="th">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {directory &&
            directory.map((item) => (
              <TableRow key={item?.id}>
                <TableCell>{item?.id}</TableCell>
                <TableCell>{item?.title}</TableCell>
                <TableCell>
                  <img
                    src={item?.imageUrl}
                    alt={item?.title}
                    width="50"
                    height="50"
                  />
                </TableCell>
                <TableCell>
                  {new Date(item?.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Flex>
                    <Button
                      size="small"
                      colorTheme="info"
                      onClick={() => {
                        router.push(`/admin/directory/create?id=${item?.id}`);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      colorTheme="error"
                      onClick={async () => {
                        dispatch(directoryApi.deleteDirectory(item.id));
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
