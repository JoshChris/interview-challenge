with
  person as (
    select 1 as id, 60 as age,  2 as group_id union all
    select 2,       67,         3             union all
    select 3,       50,         3             union all
    select 4,       57,         2             union all
    select 5,       36,         2             union all
    select 6,       61,         4             union all
    select 7,       50,         2             union all
    select 8,       27,         4             union all
    select 9,       21,         1             union all
    select 10,      46,         2             union all
    select 11,      55,         4             union all
    select 12,      21,         4             union all
    select 13,      40,         2             union all
    select 14,      59,         1             union all
    select 15,      61,         2             union all
    select 16,      55,         2             union all
    select 17,      19,         3             union all
    select 18,      31,         3             union all
    select 19,      24,         1             union all
    select 20,      71,         4
  )
select 
    group_id, 
    age, 
    id
from (
    select 
        group_id, 
        age, 
        id,
        row_number() over(partition by group_id order by age desc) as rownum
    from person
) people
where people.rownum = 2;