"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatPrice } from "@/utils/common";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetReports } from "@/hooks/query-reports/useGetReports";

export const description = "An interactive bar chart";

const chartConfig = {
  gross_sales: {
    label: "Doanh thu",
  },
  net_sales: {
    label: "Lợi nhuận",
  },
  orders_count: {
    label: "Đơn hàng",
  },
} satisfies ChartConfig;

export function DashBoardPage() {
  const [optionDay, setOptionDay] = React.useState("last_7_days");
  const { data: chartData } = useGetReports(optionDay);

  const totalGrossSale = chartData?.reduce(
    (acc, cur) => acc + cur.gross_sales,
    0
  );
  const totalNetSale = chartData?.reduce((acc, cur) => acc + cur.net_sales, 0);
  const totalOrdersCount = chartData?.reduce(
    (acc, cur) => acc + cur.orders_count,
    0
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold my-4">Thống kê doanh thu:</h1>
        <Select
          onValueChange={(value) => {
            setOptionDay(value);
          }}
        >
          <SelectTrigger className="bg-white rounded-lg shadow-lg w-[180px]">
            <SelectValue placeholder="Xem theo ngày" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="last_7_days">7 ngày trước</SelectItem>
              <SelectItem value="last_28_days">28 ngày trước</SelectItem>
              <SelectItem value="last_year">1 năm trước</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Card>
        <CardContent className="px-2 rounded-lg shadow-lg sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("vi-VN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px] to-blue-700"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("vi-VN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Bar
                name={"Doanh thu"}
                fill="#5356FF"
                dataKey="gross_sales"
                radius={4}
              />
              <Bar
                name={"Lợi Nhuận"}
                fill="#67C6E3"
                dataKey="net_sales"
                radius={4}
              />
              <Bar
                name={"Tổng số hoá đơn"}
                fill="#89A8B2"
                dataKey="orders_count"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-8 mt-4">
        <div className="border bg-white shadow-lg rounded-xl p-4 flex flex-col gap-2 items-center">
          <h1 className="text-xl font-bold my-4">Doanh thu</h1>
          <h1>{formatPrice(totalGrossSale ?? 0)}</h1>
        </div>
        <div className="border bg-white shadow-lg rounded-xl p-4 flex flex-col gap-2 items-center">
          <h1 className="text-xl font-bold my-4">Lợi Nhuận</h1>
          <h1>{formatPrice(totalNetSale ?? 0)}</h1>
        </div>
        <div className=" border bg-white shadow-lg rounded-xl p-4 flex flex-col gap-2 items-center">
          <h1 className="text-xl font-bold my-4">Tổng số đơn hàng</h1>
          <h1>{totalOrdersCount ?? 0}</h1>
        </div>
      </div>
    </>
  );
}
