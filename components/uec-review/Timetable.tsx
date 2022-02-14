import styles from "../../styles/uec-review.module.scss";
import {LectureData} from "../../pages/uec-review";
import Lecture from "./Lecture";
import React from "react";

const Timetable = ({ table }: { table: LectureData[] }) => {

    type TableGridElement = {
        row: number
        column: number
        verticalLength: number
        className: string
        element: React.ReactNode
    }

    const tableElement: TableGridElement[] = []

    // Day of weeks
    const dow = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    for (let i = 0; i < 5; i++) {
        tableElement.push({
            row: 1,
            column: 2 + i,
            verticalLength: 1,
            className: styles.fixed_cell,
            element: <>{dow[i]}</>
        })
    }

    // Time period
    for (let i = 0; i < 5; i++) {
        tableElement.push({
            row: 2 + i,
            column: 1,
            verticalLength: 1,
            className: `${styles.fixed_cell} ${styles.pc_only}`,
            element: <>{i + 1}</>
        })
    }

    const dowToIndex = (dowJp: string) => {
        switch (dowJp) {
            case '月曜日': return 2
            case '火曜日': return 3
            case '水曜日': return 4
            case '木曜日': return 5
            case '金曜日': return 6
            default: return 1
        }
    }

    for (const lecture of table) {
        tableElement.push({
            row: lecture.period + 1,
            column: dowToIndex(lecture.dow),
            verticalLength: lecture.length ?? 1,
            className: '',
            element: <Lecture lect={lecture} />
        })
    }

    tableElement.sort((a, b) => {
        if(a.column < b.column) return -1;
        if(a.column > b.column) return 1;
        if(a.row < b.row) return -1;
        if(a.row > b.row) return 1;
        return 0;
    })


    return (
        <div id={styles.timetable_grid}>
            {tableElement.map((e) => (
                <div
                    key={`table-cell-${e.row}-${e.column}`}
                    className={e.className}
                    style={{
                        gridColumn: `${e.column} / ${e.column}`,
                        gridRow: `${e.row} / ${e.row + e.verticalLength}`,
                    }}
                >
                    {e.element}
                </div>
            ))}
        </div>
    )
}

export default Timetable
