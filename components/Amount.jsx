import React from "react";
import { Add, Remove } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function Amount({ number, onChange }) {
  return (
    <div className="d-flex align-items-center">
      <div>
        <Button
          sx={{minWidth: "auto"}}
          className="p-2"
          variant="link"
          onClick={() => onChange(number + 1)}
        >
          <Add width={25} height={25} />
        </Button>
      </div>
      <div>
        <Button sx={{minWidth: "auto"}} className="p-2" variant="link" as="div">
          {number}
        </Button>
      </div>
      <div>
        <Button
          sx={{minWidth: "auto"}}
          className="p-2"
          variant="link"
          onClick={() => {
            if (number > 0) onChange(number - 1);
          }}
        >
          <Remove width={25} height={25} />
        </Button>
      </div>
    </div>
  );
}
