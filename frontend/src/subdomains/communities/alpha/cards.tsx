import React from "react";
import { Polygon } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleBand } from "@visx/scale";
import { useNavigate, useParams } from "react-router-dom";

export const background = "#7f82e3";
const polygonSize = 45;
const defaultMargin = { top: 10, right: 10, bottom: 10, left: 10 };

const polygons = [
    {
        sides: 3,
        fill: "rgb(130, 145, 65)",
        rotate: 0,
    },
    {
        sides: 4,
        fill: "rgb(130, 45, 61)",
        rotate: 45,
    },
    {
        sides: 5,
        fill: "rgb(129, 130, 255)",
        rotate: 0,
    },
    {
        sides: 6,
        fill: "rgb(229, 53, 61)",
        rotate: 45,
    },
    {
        sides: 7,
        fill: "rgb(174, 138, 148)",
        rotate: 90,
    },
    {
        sides: 8,
        fill: "rgb(30, 45, 61)",
        // fill: "rgb(123, 253, 61)",
        rotate: 45,
    },
    {
        sides: 10,
        fill: "rgb(73, 13, 205)",
        rotate: 90,
    },
    {
        sides: 12,
        fill: "rgb(42, 13, 67)",
        rotate: 45,
    },
    {
        sides: 24,
        fill: "rgb(129, 130, 55)",
        rotate: 0,
    },
    {
        sides: 48,
        fill: "#424242",
        rotate: 0,
    },
];

const yScale = scaleBand<number>({
    domain: polygons.map((p, i) => i),
    padding: 0.8,
});

export type PolygonProps = {
    width: number;
    height: number;
    margin?: typeof defaultMargin;
};

export default ({ width, height, margin = defaultMargin }: PolygonProps) => {
    const { nft_id } = useParams();
    let navigate = useNavigate();
    yScale.rangeRound([0, height - margin.top - margin.bottom]);
    const centerX = (width - margin.left - margin.right) / 3;
    return (
        <div className="my-10 flex">
            {" "}
            <svg width={width} height={height + 20} 
            // onClick={() => navigate(`/alpha/`)}
            >
                {polygons.map((polygon, i) => (
                    <Group
                        key={`polygon-${i}`}
                        top={(yScale(i) || 0) + polygonSize / 2}
                        left={margin.left + centerX + i * 20}
                        className="my-5"
                    >
                        {" "}
                        <Polygon
                            sides={polygon.sides}
                            size={polygonSize}
                            fill={polygon.fill}
                            rotate={polygon.rotate}
                            className={`${
                                nft_id == String(i + 1) ? "scale-125" : ""
                            } hover:scale-105 hover:rotate-15 transition-all cursor-pointer`}
                            onClick={() => {
                                navigate(`/collection/alpha/${i + 1}`);
                            }}
                        />
                    </Group>
                ))}
            </svg>
        </div>
    );
};
