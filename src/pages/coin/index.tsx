import { useCoin } from "../../hooks/useCoin";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter, numberToCurrency } from "../../utils";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Price } from "../../types";
import { useParams } from "react-router-dom";
import { format, addDays } from "date-fns";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { MainNav } from "../../components/ui/main-nav";

export const CoinPage = () => {
  const { detail, data, fetchCrtypto } = useCoin();
  const { coinId } = useParams();

  const [numberOfDays, setNumberOfDays] = useState("7");

  const options = {
    legend: false,
    title: {
      text: `${capitalizeFirstLetter(coinId as string)} Price Chart`,
    },
    xAxis: {
      categories: data?.prices?.map((_: Price, index: number) => {
        const date = format(addDays(new Date(), index), "MMM d");
        return date;
      }),
    },
    yAxis: [
      {
        tickAmount: 7,
        labels: {
          formatter: ({ value }: { value: number }) => numberToCurrency(value),
        },
      },
    ],
    series: [
      {
        data: data?.prices?.map((item: Price) => item[1]) ?? [],
        type: "line",
      },
    ],
  };

  useEffect(() => {
    fetchCrtypto({ days: Number(numberOfDays), coinId: coinId as string });
  }, [coinId, numberOfDays, fetchCrtypto]);

  return (
    <>
      <MainNav />
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2 my-10">
          <img
            src={detail?.image?.large}
            alt={detail?.name}
            className="h-5 w-5"
          />
          <span className="font-semibold">
            {numberToCurrency(detail?.market_data?.current_price?.aud)}
          </span>
        </div>

        <div className="gap-5 w-full flex flex-col">
          <RadioGroup
            defaultValue="option-one"
            className="flex gap-5 items-center"
            value={numberOfDays}
            onValueChange={(value) => setNumberOfDays(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="7" id="option-one" />
              <Label htmlFor="option-one">7 days</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="14" id="option-two" />
              <Label htmlFor="option-two">14 days</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="30" id="option-one" />
              <Label htmlFor="option-one">1 Month</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="60" id="option-one" />
              <Label htmlFor="option-one">2 Months</Label>
            </div>
          </RadioGroup>

          <HighchartsReact highcharts={Highcharts} options={options} />

          <div className="flex w-full my-10">
            <div
              dangerouslySetInnerHTML={{ __html: detail?.description?.en }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
