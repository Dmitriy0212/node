import fs from 'fs';
export function editTitle(body) {
    try {
        const doc = {
            postTitle: body.postTitle,
            postPhotoUrl: body.postPhotoUrl,
            postDescription: body.postDescription,
            id: Number(body.id),
            tegs: addTegs(body.postTegs),
            yearCreat: body.yearCreat,
            genre: addGenre(body.genre)
        };
        function addTegs(postTegs) {
            try {
                if (postTegs == '') {
                    return []
                }
                if (postTegs !== '') {
                    if (postTegs.includes(',')) {
                        return postTegs.split(',')
                    }
                    let a = []
                    a.push(postTegs)
                    return a
                }
            } catch (err) {
                console.log('Ошибка записи тегов', err);
            }
        }
        function addGenre(genre) {
            try {
                if (genre == '') {
                    return []
                }
                if (genre !== '') {
                    if (genre.includes(',')) {
                        return genre.split(',')
                    }
                    let a = []
                    a.push(genre)
                    return a
                }
            } catch (err) {
                console.log('Ошибка записи жанров', err);
            }
        }


        const text = JSON.parse(fs.readFileSync('./jsonfile/basejson.json', 'utf8'));
        let copy = Object.assign([], text);
        copy.titles.map((num, index) => {
            if (num.id === doc.id) {
                console.log(copy.titles[index])
                copy.titles[index]=doc
                console.log(copy.titles[index])
                copy.titles.splice(index, 1, doc)
            }
        })
        fs.writeFileSync('./jsonfile/basejson.json', JSON.stringify(text));
        return text;
    } catch (err) {
        console.log('Ошибка создания поста', err);
    }
}