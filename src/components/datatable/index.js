import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';

function Datatable(props) {

    const allowedPageSizes = [8, 12, 20];
    
    // check if the datafields has corresponding caption
    const datafields = props.fields.map(function(datafield, index) {
        if(datafield.caption){
            return (<Column key={index} dataField={datafield.field} caption={datafield.caption}  dataType={datafield.type} />)
        }else{
            return (<Column key={index}  dataField={datafield.field} dataType={datafield.type} />)
        }
    })

    return (
        <DataGrid dataSource={props.source} showBorders={true} remoteOperations={true} hoverStateEnabled={true} onCellClick={props.dataClick}>
            {datafields}
            <Paging defaultPageSize={12} />
            <Pager showPageSizeSelector={true} allowedPageSizes={allowedPageSizes} />
        </DataGrid>
    );
}

export default Datatable