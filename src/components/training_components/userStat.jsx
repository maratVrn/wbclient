import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useNavigate} from "react-router-dom";
import { Calendar } from 'primereact/calendar';
import { addLocale, locale } from 'primereact/api';
import { SelectButton } from 'primereact/selectbutton';
import { Chart } from 'primereact/chart';
import { Checkbox } from 'primereact/checkbox';

addLocale('ru', {
    firstDayOfWeek: 1,
    dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    monthNames: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    monthNamesShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    today: 'Сегодня',
    clear: 'Очистить'
});
locale('ru');
const UserStat = () => {
    const today = new Date();

    // Функция расчета начальной даты
    const getStartDate = (period) => {
        const d = new Date();
        if (period === 'week') d.setDate(today.getDate() - 7);
        else if (period === 'month') d.setMonth(today.getMonth() - 1);
        else if (period === '3months') d.setMonth(today.getMonth() - 3);
        return d;
    };

    const [startDate, setStartDate] = useState(getStartDate('week'));
    const [endDate, setEndDate] = useState(today);
    const [period, setPeriod] = useState('week');

    const options = [
        { label: 'Неделя', value: 'week' },
        { label: 'Месяц', value: 'month' },
        { label: '3 месяца', value: '3months' }
    ];

    const onPeriodChange = (e) => {
        if (e.value) {
            setPeriod(e.value);
            setStartDate(getStartDate(e.value));
            setEndDate(new Date()); // Сбрасываем конец на "сегодня"
            loadAllUserStat(getStartDate(e.value), new Date())
        }
    };

    const {userStore} = useContext(Context)
    const [allUserStat, setAllUserStat] = useState([]);
    const [dayUserStat, setDayUserStat] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const navigate = useNavigate();

    // Список всех доступных метрик
    const metrics = [
        { id: 'entry', label: 'Entry', color: '#42A5F5' },
        { id: 'viewProduct', label: 'View Product', color: '#66BB6A' },
        { id: 'search', label: 'Search', color: '#FFA726' },
        { id: 'productList', label: 'Product List', color: '#AB47BC' },
        { id: 'wbTransit', label: 'WB Transit', color: '#EF5350' },
        { id: 'addTrack', label: 'Add Track', color: '#6d50ef' }
    ];

    // Состояние: какие метрики выбраны (по умолчанию все)
    const [selectedMetrics, setSelectedMetrics] = useState(metrics.map(m => m.id));
    const [dataFromBackend, setDataFromBackend] = useState({labels:['-'],entry : [],viewProduct : [], search : [], productList  : [],wbTransit : [], addTrack : []})


    const onMetricChange = (e) => {
        let _selectedMetrics = [...selectedMetrics];
        if (e.checked) _selectedMetrics.push(e.value);
        else _selectedMetrics.splice(_selectedMetrics.indexOf(e.value), 1);
        setSelectedMetrics(_selectedMetrics);
    };
    // Формируем данные для графика на основе выбранных чекбоксов
    const chartData = {
        labels: dataFromBackend.labels,
        datasets: metrics
            .filter(m => selectedMetrics.includes(m.id)) // Убираем невыбранные
            .map(m => ({
                label: m.label,
                data: dataFromBackend[m.id],
                borderColor: m.color,
                backgroundColor: m.color,
                tension: 0.4,
                fill: false
            }))
    };

    const chartOptions = {
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }, // Скрываем стандартную легенду, так как есть чекбоксы
        scales: {
            y: { beginAtZero: true, ticks: { stepSize: 1 } }
        }
    };

    function loadAllUserStat(startDate, endDate){
        userStore.loadAllUserStat(startDate, endDate ).then(() => {
            setAllUserStat(userStore.allUserStat)
            setDataFromBackend(userStore.chartData)
            }
        )
    }
    const ipCountTemplate = (product) => {
        return <>
            {product.statIPInfo.length}
        </>

    };

    function setSelectedData(value){
        setSelectedDay(value)
        try {setDayUserStat(value.statIPInfo)} catch (e) {}
    }

    useEffect(()=>{
        if (!userStore.isLogin) navigate('/')
          else if (userStore.role !== "ADMIN") navigate('/')
        else {
            loadAllUserStat(startDate, endDate)
        }

    }, [])


    return (

        <div style={{padding: '20px'}}>
            <div className="card flex flex-wrap gap-4">
                <div className="flex gap-4">
                    {/* Переключатель периодов */}
                    <div className="mb-4">
                        <SelectButton
                            value={period}
                            options={options}
                            onChange={onPeriodChange}
                        />
                    </div>

                    {/* Календари */}
                    <div className="flex gap-4">
                        <div className="flex-auto">

                            <Calendar
                                value={startDate}
                                onChange={(e) => {setStartDate(e.value);loadAllUserStat(e.value, endDate)}}
                                dateFormat="dd.mm.yy"
                                showIcon
                            />
                        </div>
                        <div className="flex-auto">

                            <Calendar
                                value={endDate}
                                onChange={(e) => {setEndDate(e.value);loadAllUserStat(startDate, e.value)}}
                                dateFormat="dd.mm.yy"
                                showIcon
                                minDate={startDate} // Ограничение: нельзя выбрать дату раньше начала
                            />
                        </div>
                    </div>
                </div>
                <Button severity="secondary" label="Загрузить статистику за выбранный период"
                        style={{height: '46px', fontSize: '14px', marginBottom: '10px', marginLeft: '10px'}}
                        onClick={() => loadAllUserStat(startDate, endDate)}/>

            </div>

            {/* Панель чекбоксов */}
            <div className="flex flex-wrap gap-4 mb-4 p-3 border-round bg-gray-50">
                {metrics.map((m) => (
                    <div key={m.id} className="flex align-items-center">
                        <Checkbox
                            inputId={m.id}
                            value={m.id}
                            onChange={onMetricChange}
                            checked={selectedMetrics.includes(m.id)}
                        />
                        <label htmlFor={m.id} className="ml-2" style={{color: m.color, fontWeight: 'bold'}}>
                            {m.label}
                        </label>
                    </div>
                ))}
            </div>
            <div style={{height: '400px'}}>
                <Chart style={{height: '100%'}} type="line" data={chartData} options={chartOptions}/>
            </div>

            <div className=" align-items-center justify-content-center p-1 m-2 border-round border-1">
                <DataTable
                    paginator rows={10} rowsPerPageOptions={[10, 20, 30]}
                    value={allUserStat} selectionMode="single" selection={selectedDay}
                    onSelectionChange={(e) => setSelectedData(e.value)}
                    dataKey="id"
                    tableStyle={{minWidth: '20rem'}}>
                    <Column field="id" header="id"></Column>
                    <Column field="crDate" header="crDate"></Column>
                    <Column body={ipCountTemplate} header="IP Count"></Column>

                </DataTable>
            </div>

            <div className=" align-items-center justify-content-center p-1 m-2 border-round border-1">
                <DataTable
                    paginator rows={30} rowsPerPageOptions={[30, 50, 100]}
                    value={dayUserStat} selectionMode="single"
                    dataKey="ip"
                    tableStyle={{minWidth: '20rem'}}>
                    <Column field="ip" header="ip"></Column>
                    <Column field="entryCount" header="entry"></Column>
                    <Column field="viewProductCount" header="viewProduct"></Column>
                    <Column field="searchCount" header="search"></Column>
                    <Column field="productListCount" header="productList"></Column>
                    <Column field="wbTransitCount" header="wbTransit"></Column>
                    <Column field="allActionCount" header="allAction"></Column>

                </DataTable>
            </div>

        </div>
    );
};

export default UserStat;