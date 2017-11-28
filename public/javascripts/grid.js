$(document).ready(function() {
  $('#color-picker').spectrum({
    color: '#f00'
  });

  const gridContainer = $('#grid-container');
  socket.emit('join', gridContainer.data('id'));

  $('#clear').on('click', function(event) {
    const key = gridContainer.data('id');
    const data = { key };
    $.ajax({
      url: `/grid/clear`,
      type: 'PATCH',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function(updatedGrid, textStatus, jqXhr) {
        console.log('Patch has been successful!');
        console.log('deleted');

        const grid = updatedGrid.grid;

        gridContainer.empty();

        for (let r = 0; r < grid.length; ++r) {
          let row = $('<div></div>', { class: 'row' });
          for (let c = 0; c < grid[r].length; ++c) {
            let cell = $('<div></div>', { class: 'grid-cell' });
            cell.css('background-color', '#fff');

            row.append(cell);
          }
          gridContainer.append(row);
        }
      }
    });

    // Clear based on board
  });

  gridContainer.on('click', '.grid-cell', function(event) {
    let color = $('#color-picker').spectrum('get').toHexString();
    console.log(color);
    $(this).css('background-color', color);

    // PATCH
    const key = gridContainer.data('id');
    const row = $(this).data('row');
    const column = $(this).data('col');

    // Handle socket
    socket.emit('color', key, row, column, color);

    socket.on('color', function(row, column, color) {
      console.log('COLORING IN NEW GRID');
    });

    const data = { key, row, column, color };

    $.ajax({
      url: `/grid/${key}`,
      type: 'PATCH',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function(response, textStatus, jqXhr) {
        console.log('Patch has been successful!');
        console.log('Response: ' + response);
      }
    });
  });
});
