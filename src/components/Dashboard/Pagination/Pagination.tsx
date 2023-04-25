import React, { Dispatch, SetStateAction } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useRouter } from "next/router";

interface IProps {
  curPage: number;
  numOfPages: number;
}
export default function CustomPagination(props: IProps) {
  const router = useRouter();

  // Scroll to top when page changes
  const handlePageChange = (page: string) => {
    let newPath: string = router.pathname.slice(0, -4) + page;
    router.replace(newPath);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: 10,
      }}
    >
      <Pagination
        onChange={(e: React.ChangeEvent<unknown>) =>
          handlePageChange(String((e.target as HTMLElement).textContent))
        }
        count={props.numOfPages}
        page={props.curPage}
        color="primary"
        hideNextButton
        hidePrevButton
      />
    </div>
  );
}
