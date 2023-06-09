import useCartSubjectStore from "@/stores/useCartSubjectStore";
import { Icon } from "@iconify/react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Input } from "antd";
import { NextPage } from "next";
import { useState } from "react";
import useSearchStore from "./store/useSearchStore";
import SearchBar from "./SearchBar";
import ListSubjects from "./ListSubjects";

interface Props {}

const ShopSubject: NextPage<Props> = () => {
  return (
    <div className="flex flex-col gap-3">
     <SearchBar />
      <div className="flex flex-col">
        <ListSubjects />
      </div>
    </div>
  );
};

export default ShopSubject;
